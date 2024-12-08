/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

// Tipo Missionário
interface Missionario {
    name: string;
    age: string;
    community: string;
    status: boolean; // true = ativo, false = inativo
}

const Missionarios = () => {
    // Dados pré-registrados
    const [missionarios, setMissionarios] = useState<Missionario[]>([
        { name: 'Jose Silva', age: '30', community: 'Mecula, Niassa - Norte', status: true },
        { name: 'Maria Souza', age: '25', community: 'Chinde, Zambézia - Centro', status: false },
        { name: 'Carlos Oliveira', age: '40', community: 'Mueda, Cabo Delgado - Norte', status: true },
    ]);

    const [newMissionario, setNewMissionario] = useState<Missionario>({ name: '', age: '', community: '', status: false });
    const [showFormDialog, setShowFormDialog] = useState<boolean>(false);
    const [selectedMissionario, setSelectedMissionario] = useState<Missionario | null>(null);
    const [filterName, setFilterName] = useState<string>(''); // Filtro por nome
    const [statusFilter, setStatusFilter] = useState<string>('Todos'); // Filtro por status
    const [detailsDialogVisible, setDetailsDialogVisible] = useState<boolean>(false);

    const comunidades = ['Mecula, Niassa - Norte', 'Marrupa, Niassa - Norte', 'Chinde, Zambézia - Centro']; // Lista de comunidades

    // Adicionar missionário
    const addMissionario = () => {
        if (newMissionario.name && newMissionario.age && newMissionario.community) {
            setMissionarios([...missionarios, { ...newMissionario, status: false }]);
            setNewMissionario({ name: '', age: '', community: '', status: false });
            setShowFormDialog(false);
        }
    };

    // Alternar status
    const toggleStatus = (index: number) => {
        const updatedMissionarios = [...missionarios];
        updatedMissionarios[index].status = !updatedMissionarios[index].status;
        setMissionarios(updatedMissionarios);
    };

    // Abrir dialog de detalhes
    const showDetails = (missionario: Missionario) => {
        setSelectedMissionario(missionario);
        setDetailsDialogVisible(true);
    };

    // Ícone dinâmico para status
    const statusBodyTemplate = (rowData: Missionario, index: number) => (
        <Button
            icon={rowData.status ? 'pi pi-check' : 'pi pi-times'}
            className={`p-button-rounded ${rowData.status ? 'p-button-success' : 'p-button-danger'}`}
            onClick={() => toggleStatus(index)}
            tooltip={rowData.status ? 'Ativo' : 'Inativo'}
        />
    );

    // Botão "Ver Detalhes"
    const detailsButtonTemplate = (rowData: Missionario) => (
        <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-info"
            onClick={() => showDetails(rowData)}
            tooltip="Ver Detalhes"
        />
    );

    // Filtrar por nome e status
    const filteredMissionarios = missionarios.filter((missionario) => {
        const matchesName = missionario.name.toLowerCase().includes(filterName.toLowerCase());
        const matchesStatus =
            statusFilter === 'Todos' ||
            (statusFilter === 'Ativos' && missionario.status) ||
            (statusFilter === 'Inativos' && !missionario.status);
        return matchesName && matchesStatus;
    });

    return (
        <div className="card">
            <h2>Gestão de Missionários</h2>

            
            <div style={{display: "flex"}}>
                <div>
                    <span className="p-float-label p-mr-2">
                        <InputText
                            id="filterName"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                        <label htmlFor="filterName">Filtrar por Nome</label>
                    </span>
                    <hr />

                    <Dropdown
                        value={statusFilter}
                        options={['Todos', 'Ativos', 'Inativos']}
                        onChange={(e) => setStatusFilter(e.value)}
                        placeholder="Filtrar por Status"
                        className="p-ml-2"
                        style={{marginBottom: "15px"}}
                    />
                </div>

                <Button
                    label=""
                    icon="pi pi-plus"
                    onClick={() => setShowFormDialog(true)}
                    className="p-button-primary"
                    style={{height: "45px", width: "45px", marginLeft: "10px", position: "absolute", right: "20px", bottom: "40px", borderRadius: "100%"}}
                />
            </div>

            
            <DataTable value={filteredMissionarios} responsiveLayout="scroll">
                <Column field="name" header="Nome" />
                <Column field="age" header="Idade" />
                <Column field="community" header="Comunidade" />
                <Column header="Status" body={(rowData, props) => statusBodyTemplate(rowData, props.rowIndex)} />
                <Column header="Ações" body={detailsButtonTemplate} />
            </DataTable>

            
            <Dialog header="Adicionar Missionário" visible={showFormDialog} onHide={() => setShowFormDialog(false)} modal>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-mb-2">
                        <InputText
                            placeholder="Nome"
                            value={newMissionario.name}
                            onChange={(e) => setNewMissionario({ ...newMissionario, name: e.target.value })}
                        />
                    </div>
                    <div className="p-col-12 p-mb-2" style={{marginTop: "15px", marginBottom: "15px"}}>
                        <InputText
                            placeholder="Idade"
                            value={newMissionario.age}
                            onChange={(e) => setNewMissionario({ ...newMissionario, age: e.target.value })}
                        />
                    </div>
                    <div className="p-col-12 p-mb-2">
                        <Dropdown
                            value={newMissionario.community}
                            options={comunidades}
                            onChange={(e) => setNewMissionario({ ...newMissionario, community: e.value })}
                            placeholder="Selecione a Comunidade"
                        />
                    </div>
                </div>
                <div className="p-d-flex p-jc-end" style={{marginTop: "15px"}}>
                    <Button label="" icon="pi pi-check" onClick={addMissionario} className="p-button-success" style={{marginRight: "10px"}}/>
                    <Button label="" icon="pi pi-times" onClick={() => setShowFormDialog(false)} className="p-button-danger p-ml-2" />
                </div>
            </Dialog>

            {/* Dialog de Detalhes */}
            <Dialog header="Detalhes do Missionário" visible={detailsDialogVisible} onHide={() => setDetailsDialogVisible(false)} modal>
                {selectedMissionario && (
                    <table className="p-datatable p-datatable-striped">
                        <tbody>
                            <tr>
                                <td><strong>Nome:</strong></td>
                                <td>{selectedMissionario.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Idade:</strong></td>
                                <td>{selectedMissionario.age}</td>
                            </tr>
                            <tr>
                                <td><strong>Comunidade:</strong></td>
                                <td>{selectedMissionario.community}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td>
                                    <Tag value={selectedMissionario.status ? 'Ativo' : 'Inativo'} severity={selectedMissionario.status ? 'success' : 'danger'} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Dialog>
        </div>
    );
};

export default Missionarios;




