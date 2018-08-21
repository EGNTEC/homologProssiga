Ext.define('desloc.store.NovoDiaS', {
    extend: 'Ext.data.Store',

    //storeId: 'regStore',
    model: 'desloc.model.NovoDiaM',
    //autoLoad: true,

    proxy: {
        type: 'ajax',
        //url:'/php/Prestacao/ValorAdicional.php',
        api: {
            read: '/teste2/php/Prestacao/NovoDia.php',
            destroy: '/teste2/php/Prestacao/DelNovoDia.php'
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