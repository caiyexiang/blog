const Category = require('../models/category')
const Article = require('../models/article')
const ArticleDao = require('../dao/article')

class CategoryDao {
  static async createCategory(v) {
    const hasCategory = await Category.findOne({
      key: v.get('body.key')
    })
    if (hasCategory) {
      throw new global.errs.Existing('分类已存在')
    }
    const category = new Category()
    category.name = v.get('body.name')
    category.key = v.get('body.key')
    category.save()
  }
  static async destroyCategory(id) {
    const category = await Category.findById(id)
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    category.remove()
  }
  static async getCategory(id) {
    const category = await Category.findById(id)
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    const { key, name, _id } = category
    return { key, name, _id }
  }
  static async updateCategory(id, v) {
    const category = await Category.findById(id)
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }
    category.name = v.get('body.name')
    category.key = v.get('body.key')
    category.save()
  }
  static async getCategoryList() {
    const category = await Category.find({}).lean()
    const articleCount = await Article.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ])
    for (let c of category) {
      const findResult = articleCount.find(
        item => item._id.toString() === c._id.toString()
      )
      if (findResult) {
        c.count = findResult.count
      }
    }
    return category
  }
}

module.exports = CategoryDao
