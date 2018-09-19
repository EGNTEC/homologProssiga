Ext.define('desloc.store.cargosGestao.listarAbrPrest', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.cargosGestao.listarAbrPrest',

    autoLoad: true,

    pageSize: 4,

    proxy: {
        type: 'ajax',
        
        api: {

            read: '/teste2/php/Prestacao/cargosGestao/ListCadCR.php'
        },

        reader: {
            type: 'json',
            root: 'data'
        },

        writer: {
            type: 'json',
            root: 'data',
            writerAllFields: true,
            encode: true,
            allowSingle: false
        }

    }

});