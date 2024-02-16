{
    #  Information
    'name': 'POS Second UoM',
    'version': '16.0.0.1.0',
    'summary': 'Add a second UoM for products in POS Screen',
    'description': 'Add a second UoM for products in POS Screen.',
    'category': 'point_of_sale',

    # Author
    'author': 'Odoo PS',
    'website': 'https://www.odoo.com/',
    'license': 'LGPL-3',

    # Dependency
    'depends': ['point_of_sale'],
    'data': [
        'views/product_template_views.xml'
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_second_uom/static/src/js/Screens/ProductScreen/ControlButtons/models.js',
            'pos_second_uom/static/src/js/Screens/ProductScreen/ControlButtons/AddQuantityButton.js',
            'pos_second_uom/static/src/xml/Screens/ProductScreen/ControlButtons/AddQuantityButton.xml',
        ],
    },

    # Other
    'installable': True,
    'auto_install': False,
}
