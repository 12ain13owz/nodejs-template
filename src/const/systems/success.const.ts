export const SUCCESS = {
  GENERIC: {
    OK: 'Operation successful',
    CREATED: 'Data created successfully',
    UPDATED: 'Data updated successfully',
    DELETED: 'Data deleted successfully',
  },
  CONFIG: {
    load: (envFile: string) => `[Config] ✅ Loaded environment from: ${envFile}`,
  },
  UTIL: {
    create: (name: string) => `Created ${name} successfully`,
    update: (name: string) => `Updated ${name} successfully`,
    delete: (name: string) => `Deleted ${name} successfully`,
    save: (name: string) => `Saved ${name} successfully`,
    upload: (name: string) => `Uploaded ${name} successfully`,
  },
}
