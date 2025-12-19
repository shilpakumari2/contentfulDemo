var express = require('express')
var router = express.Router()
var { getBasePage, getHeader, getHomePage  } = require('../lib/contentful') 

router.get('/', async function (req, res, next) {
  try {
    const page = await getBasePage()
  const header = await getHeader();
      const homePage = await getHomePage();

    if (!page) {
      return res.status(404).send('Base page not found')
    }


    // Render Nunjucks template with the page
    res.render('index.njk', { 
       page: {
        ...page,
        ...homePage
      },
            seo: page.seo || {},
            header
     })

  } catch (err) {
    console.error(err)
    res.status(500).send('Error fetching content from Contentful')
  }
})
/* GET home page. */
/*router.get('/', async function (req, res, next) {
  const recipes = await getAllRecipes()
  res.render('index', { title: 'Vegetarian Cookbook', recipes: recipes })
    res.render('index', { title: 'Vegetarian Cookbook' })

})*/

module.exports = router
