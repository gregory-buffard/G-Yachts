import { Access } from "payload/config";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes('admin')) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      }
    }
  }

  return false;
}