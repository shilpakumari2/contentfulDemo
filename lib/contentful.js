const { createClient } = require('contentful')

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

module.exports.getAllRecipes = () => {
  return client
    .getEntries({ content_type: 'recipe' })
    .then((entries) => entries.items)
}

module.exports.getArticles = () => {
  return client
    .getEntries({ content_type: 'articlepost' })
    .then((entries) => entries.items)
}


module.exports.getRecipe = (slug) => {
  return client
    .getEntries({ content_type: 'recipe', 'fields.slug': slug })
    .then((entries) => entries.items)
}

module.exports.getBasePage = () => {
  return client
    .getEntries({ content_type: 'everencebase', limit: 1, include: 3 })
    .then((entries) => {
      if (!entries.items.length) return null;

      const basePage = entries.items[0].fields;
      const seo = basePage.seo && basePage.seo.fields ? basePage.seo.fields : null;

      return {
        title: basePage.title,
        seo
      };  
    });

    
}

module.exports.getHomePage = () => {
  return client
    .getEntries({
      content_type: 'everencehomepage',
      limit: 1,
      include: 3
    })
    .then((entries) => {
      if (!entries.items.length) return null;

      const fields = entries.items[0].fields;

      console.log('HOMEPAGE HERO:', fields.herobanner);
      console.log('articles:', fields.articles);
      console.log('stirycard:', fields.joingreenland);

      return {
        herobanner: fields.herobanner || [],
        impact: fields.impact || [],
        articles: fields.articles || [],
        joingreenland: fields.joingreenland || []

      };
    });
};

module.exports.getHeader = () => {
  return client
    .getEntries({
      content_type: 'header',
      limit: 1,
      include: 2 
    })
    .then((entries) => {
      if (!entries.items.length) return null;
      return entries.items[0].fields;
    });
};

