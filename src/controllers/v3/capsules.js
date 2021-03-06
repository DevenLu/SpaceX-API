
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const sort = require('../../builders/v3/sort');
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Returns all capsule information
   */
  all: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific capsule information
   */
  one: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find({ capsule_serial: ctx.params.cap })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
