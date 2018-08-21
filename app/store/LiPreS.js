Ext.define('desloc.store.LiPreS', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.LiPreM',

    /*proxy: {
        type:'ajax',
        url:'/php/Prestacao/LiPre.php',

        reader: {
            type:'json',
            root:'data'

        }
    }*/

    proxy: {
        type: 'ajax',
        //url:'/php/Prestacao/ValorAdicional.php',

        api: {

            read: '/teste2/php/Prestacao/LiPre.php',
            destroy: '/teste2/php/Prestacao/LiberarPrestacao.php',
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