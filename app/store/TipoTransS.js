Ext.define('desloc.store.TipoTransS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.TipoTransM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/TipoTrans.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});