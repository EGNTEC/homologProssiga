Ext.define('desloc.store.PlanNRealS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.PlanNRealM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/PlanNReal.php',

        reader: {
            type: 'json',
            root: 'data'
        }

    }

});