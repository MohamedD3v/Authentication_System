export const create = async ({ model, data = {} } = {}) => {
  return await model.create(data);
};

export const findOne = async ({
  model,
  filter = {},
  select = "",
  populate = [],
} = {}) => {
  return await model.findOne(filter).select(select).populate(populate);
};

export const findById = async ({ model, id, select = "" } = {}) => {
  return await model.findById(id).select(select);
};

export const findOneAndDelete = async ({ model, filter={}, select = "" } = {}) => {
  return await model.findOneAndDelete(filter).select(select);
};

export const deleteOne = async ({ model, filter= {} } = {}) => {
  return await model.deleteOne(filter);
};
