const SwaggerService = require('../services/SwaggerService');

class SwaggerController {
  static render(req, res) {
    res.type('html').send(SwaggerService.getUiHtml());
  }

  static getSpec(req, res) {
    try {
      const spec = SwaggerService.getSpec();
      return res.status(200).json(spec);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to load Swagger specification'
      });
    }
  }
}

module.exports = SwaggerController;
