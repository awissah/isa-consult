odoo.define('pos_second_uom.AddQuantityButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');

    class AddQuantityButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }

        async onClick() {
            const selectedOrderline = this.env.pos.get_order().get_selected_orderline();
            if (!selectedOrderline) return;

            const second_uom = selectedOrderline.product.second_uom_id[1] || 'Units';
            const second_uom_id = selectedOrderline.product.second_uom_id[0] || false;
            const { confirmed, payload: quantity } = await this.showPopup('TextInputPopup', {
                title: this.env._t(`Enter Quantity in ${second_uom}`),
                placeholder: this.env._t('Quantity'),
            });

            if (confirmed) {
                selectedOrderline.set_quantity_with_second_uom(quantity, second_uom_id);
            }
        }
    }
    AddQuantityButton.template = 'AddQuantityButton';

    ProductScreen.addControlButton({
        component: AddQuantityButton,
    });

    Registries.Component.add(AddQuantityButton);

    return AddQuantityButton;
});
