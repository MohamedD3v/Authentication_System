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
