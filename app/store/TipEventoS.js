Ext.define('desloc.store.TipEventoS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',   

    model: 'desloc.model.TipEventoM',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/teste2/php/Prestacao/TipEvento.php',

        reader: {
            type: 'json',
            root: 'data'

        }

    }

});