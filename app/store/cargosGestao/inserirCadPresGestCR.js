Ext.define('desloc.store.cargosGestao.inserirCadPresGestCR', {
    extend: 'Ext.data.Store',
    //autoload : true,
    model: 'desloc.model.cargosGestao.inserirCadPresGestCR',

    proxy: {
        type: 'ajax',

        api: {

            read: '/teste2/php/Prestacao/cargosGestao/inserirCadPresGestCR.php'
            //create: '/teste2/php/Prestacao/InsCadPre.php',
            //destroy: '/teste2/php/Prestacao/DelCadPre.php'

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