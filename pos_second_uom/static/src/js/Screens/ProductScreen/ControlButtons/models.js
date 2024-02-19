odoo.define('pos_second_uom.models', function (require) {
    "use strict";
    
    var { Orderline } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');
    var field_utils = require('web.field_utils');
    
    const CustomOrderline = (Orderline) => class CustomOrderline extends Orderline {
        set_quantity_with_second_uom(qty, second_uom_id) {
            const uom = this.get_unit();
            if (second_uom_id){
                const second_uom = this.pos.units_by_id[second_uom_id];
                if (uom.uom_type === 'bigger' || uom.uom_type === 'smaller'){
                    this.quantity = qty / uom.factor_inv;
                }else{
                    this.quantity = qty * second_uom.factor_inv;
                }
                this.quantityStr = field_utils.format.float(parseFloat(this.quantity), { digits: [true, this.pos.dp['Product Unit of Measure']] });
            }
        }
    }
    Registries.Model.extend(Orderline, CustomOrderline);
});
