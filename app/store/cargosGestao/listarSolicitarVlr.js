Ext.define('desloc.store.cargosGestao.listarSolicitarVlr', {
    extend: 'Ext.data.Store',

    model: 'desloc.model.cargosGestao.listarSolicitarVlr',

    autoLoad: true,

    pageSize: 4,

    proxy: {
        type: 'ajax',
        
        api: {

            read: '/teste2/php/Planejamento/cargosGestao/ListCadCR.php',
            destroy: '/teste2/php/Planejamento/updateSituacao.php'
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