/**
 * Generates a unique 4-digit ID for a given model
 * @param {Object} Model - Mongoose model constructor
 * @returns {Promise<string>} - Unique 4-digit ID (0001-9999)
 */
async function generateUniqueId(Model) {
  try {
    // Find the document with the highest uniqueId (exclude null/undefined)
    const lastDoc = await Model.findOne({
      uniqueId: { $exists: true, $ne: null }
    })
      .sort({ uniqueId: -1 })
      .select('uniqueId')
      .lean()
      .exec();

    let newId;
    if (lastDoc && lastDoc.uniqueId) {
      // Parse the existing ID (remove leading zeros if any) and increment
      const lastId = parseInt(lastDoc.uniqueId, 10);
      newId = lastId + 1;
    } else {
      // Start from 0001 if no documents with uniqueId exist
      newId = 1;
    }

    // Ensure it's 4 digits with leading zeros
    const uniqueId = newId.toString().padStart(4, '0');

    // If we've reached 9999, throw an error (unlikely but good to handle)
    if (parseInt(uniqueId, 10) > 9999) {
      throw new Error('Maximum unique ID limit reached (9999)');
    }

    return uniqueId;
  } catch (error) {
    throw new Error(`Error generating unique ID: ${error.message}`);
  }
}

module.exports = generateUniqueId;

