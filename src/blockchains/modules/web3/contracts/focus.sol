// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Focus {

    address public proprietario;

    struct Document {
        string[] docsAttributes;
        string cid;
    }
    mapping(string => mapping(string => Document[])) private Processes;

    constructor() {
        proprietario = msg.sender;
    }

    function insertDocument(string memory _idProcess, string memory _codStep, string[] memory _docsAttributes, string memory _cid) public returns (string memory) {
        if(msg.sender != proprietario){
            return "Error: apenas o proprietario do contrato pode executar essa funcao";
        }
        
        Processes[_idProcess][_codStep].push(Document(
            _docsAttributes, _cid));
        
        return "SUCESSO: Documento Incluido";
    }

    function readDocuments(string memory _idProcess, string memory _codStep) public returns(Document[] memory){
        return Processes[_idProcess][_codStep];
    }

    function readDocument(string memory _idProcess, string memory _codStep, uint pos) public returns(Document memory){
        return Processes[_idProcess][_codStep][pos];
    }

    function documentAmount(string memory _idProcess, string memory _codStep) public returns(uint){
        return Processes[_idProcess][_codStep].length;
    }

}