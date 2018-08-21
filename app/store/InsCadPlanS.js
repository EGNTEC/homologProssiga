Ext.define('desloc.store.InsCadPlanS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.InsCadPlanM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/Planejamento/ListCadPlan.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});