module.exports = {
  async bootstrap({ strapi }) {
    // Set permissions for public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const publicPermissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({ where: { role: publicRole.id } });

      const leadPermissions = publicPermissions.filter(
        (permission) => permission.action.startsWith('api::lead.lead')
      );

      // Enable find, findOne, create, and update permissions
      const actionsToEnable = [
        'api::lead.lead.find',
        'api::lead.lead.findOne',
        'api::lead.lead.create',
        'api::lead.lead.update',
      ];

      for (const permission of leadPermissions) {
        if (actionsToEnable.includes(permission.action)) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: true },
            });
        }
      }

      console.log('✅ Lead API permissions enabled for public role');
    }
  },
};
