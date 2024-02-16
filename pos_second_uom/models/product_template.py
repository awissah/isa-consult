# -*- coding: utf-8 -*-

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    second_uom_id = fields.Many2one('uom.uom', 'Second UoM',
                                    help="Second unit of measure used for all stock operations. It must be in the same category as the unit of measure.")

    @api.constrains('uom_id', 'second_uom_id')
    def _check_uom(self):
        if any(
                template.uom_id and template.second_uom_id and template.uom_id.category_id != template.second_uom_id.category_id
                for template in self):
            raise ValidationError(
                _('The default Unit of Measure and the second Unit of Measure must be in the same category.'))

        if any(template.second_uom_id and template.second_uom_id.uom_type != "reference" for template in self):
            raise ValidationError(_('The second Unit of Measure must be a reference unit.'))

    @api.onchange('second_uom_id')
    def _onchange_second_uom(self):
        if self.uom_id and self.second_uom_id and self.uom_id.uom_type != "bigger":
            raise ValidationError(_('The second Unit of Measure can be set only in case of bigger UoM.'))
