class PermissionsPolicyMixin:
    """Mixin for ViewSet, which allows to distribute permissions for every action"""

    permission_classes_by_action = {}

    def get_permissions(self):
        permissions = self.permission_classes_by_action.get(self.action, self.permission_classes)
        return [permission() for permission in permissions]
