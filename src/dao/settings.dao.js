const Settings = require("../schemas/settings.schema");
const { ObjectId } = require("mongoose").Schema.Types;
class SettingsDAO {
  static createSettings(data) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await Settings.create(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @param {object} edit | object contains edit informations
   **/
  static async EditOnSettings(edit) {
    try {
      const editResult = await Settings.updateOne(
        { _id: edit.settings_id },
        { ...edit }
      );
      console.log(
        "🚀 ~ file: settings.dao.js ~ line 23 ~ SettingsDAO ~ EditOnSettings ~ editResult",
        editResult
      );

      return editResult.modifiedCount;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} settings_id | the id of settings must get back
   **/
  static GetSettings() {
    return new Promise(async (resolve, reject) => {
      try {
        const settings = await Settings.findOne();
        resolve(settings);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = SettingsDAO;
