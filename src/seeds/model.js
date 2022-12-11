module.exports = async (models) => {
    models.Models.create({
        id: '1',
        description: 'Documento de Formalização da Demanda',
        attr: 'setor_requisitante;matricula_siape;quantidade_contratada',
        modelName: 'Formalização Demanda',
        attrNotNull: null,
    });
    models.Models.create({
        id: '2',
        description: 'Documento de assinatura de TED',
        attr: 'numero;assunto;data',
        modelName: 'Nota Tecnica',
        attrNotNull: null,
    });
    models.Models.create({
        id: '3',
        description: 'Celebração de TED',
        attr: 'numero;assunto;data',
        modelName: 'Oficio',
        attrNotNull: null,
    });
};
