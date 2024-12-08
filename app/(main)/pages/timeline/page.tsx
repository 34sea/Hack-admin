'use client';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


interface Comunidade {
    id: number;
    name: string;
    region: string;
    description: string;
    latitude: string;
    longitude: string;
}

const ComunidadeScreen = () => {
    const initialComunidades: Comunidade[] = [
        {
            id: 1,
            name: 'Mecula',
            region: 'Niassa - Norte',
            description: 'Mecula, localizada no norte do Parque Nacional do Niassa, possui uma população dispersa e dificuldades de conectividade. A infraestrutura de telecomunicações é mínima, tornando o acesso à internet quase inexistente',
            latitude: '-12.1400',
            longitude: '37.6800',
        },
        {
            id: 2,
            name: 'Chinde',
            region: 'Zambézia - Centro',
            description: 'Situado no delta do rio Zambeze, Chinde é uma região remota onde a infraestrutura tecnológica é muito limitada. Muitas áreas ainda dependem de rádios para comunicação e acesso a notícias básicas devido à ausência de redes móveis e de internet',
            latitude: '-18.5816',
            longitude: '36.4651',
        },
        {
            id: 3,
            name: 'Mueda',
            region: 'Cabo Delgado - Norte',
            description: 'Esta região enfrenta desafios devido a conflitos e deslocamento de populações. O acesso à tecnologia é dificultado tanto pela falta de infraestrutura quanto pelas crises humanitárias recorrentes ',
            latitude: '-11.6525',
            longitude: '39.5540',
        },
        {
            id: 4,
            name: 'Marrupa',
            region: ' Niassa - Norte',
            description: 'Marrupa está entre os distritos com menos desenvolvimento tecnológico, com uma grande parte da população sem acesso a eletricidade, o que dificulta a chegada de tecnologia e internet',
            latitude: '-13.5003',
            longitude: '37.9965',
        },
    ];

    const [comunidades, setComunidades] = useState<Comunidade[]>(initialComunidades);
    const [filteredComunidades, setFilteredComunidades] = useState<Comunidade[]>(initialComunidades);
    const [selectedComunidade, setSelectedComunidade] = useState<Comunidade | null>(null);
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newComunidade, setNewComunidade] = useState<Comunidade>({
        id: 0,
        name: '',
        region: '',
        description: '',
        latitude: '',
        longitude: '',
    });

    // Filtra as comunidades conforme o nome
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);

        const filtered = comunidades.filter((comunidade) =>
            comunidade.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredComunidades(filtered);
    };

    // Abrir o diálogo de detalhes
    const showDetails = (comunidade: Comunidade) => {
        setSelectedComunidade(comunidade);
        setVisible(true);
    };

    // Função para renderizar o diálogo de detalhes
    const renderDialog = () => {
        if (!selectedComunidade) return null;

        return (
            <Dialog
                header="Detalhes da Comunidade"
                visible={visible}
                style={{ width: '30vw' }}
                onHide={() => setVisible(false)}
            >
                <table className="p-datatable" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>{selectedComunidade.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Região:</strong></td>
                            <td>{selectedComunidade.region}</td>
                        </tr>
                        <tr>
                            <td><strong>Descrição:</strong></td>
                            <td>{selectedComunidade.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Localização:</strong></td>
                            <td>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedComunidade.latitude},${selectedComunidade.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Abrir no Google Maps
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Dialog>
        );
    };

    // Função para abrir o formulário de adicionar comunidade
    const showAddForm = () => {
        setShowAddDialog(true);
    };

    // Função para adicionar a nova comunidade
    const handleAddComunidade = () => {
        const newId = comunidades.length + 1;
        const newComunidadeWithId = { ...newComunidade, id: newId };
        setComunidades([...comunidades, newComunidadeWithId]);
        setFilteredComunidades([...comunidades, newComunidadeWithId]);
        setShowAddDialog(false);
        setNewComunidade({
            id: 0,
            name: '',
            region: '',
            description: '',
            latitude: '',
            longitude: '',
        });
    };

    // Função para remover comunidade
    const handleRemoveComunidade = (id: number) => {
        const updatedComunidades = comunidades.filter((comunidade) => comunidade.id !== id);
        setComunidades(updatedComunidades);
        setFilteredComunidades(updatedComunidades);
    };

    return (
        <div className="card">
            <h3>Comunidades</h3>

            <hr />

            <div style={{ marginBottom: '20px', display: "flex" }}>
                <p>Total: {comunidades.length}</p>
                <p style={{marginLeft: "10px"}}>Filtradas: {filteredComunidades.length}</p>
            </div>

            <hr />
            <div className="p-d-flex p-ai-center" style={{ marginBottom: '20px' }}>
                <InputText
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por nome"
                    style={{ width: '300px' }}
                />
            </div>

            
           

            
            <DataTable value={filteredComunidades} paginator rows={5} responsiveLayout="scroll">
                <Column field="name" header="Nome da Comunidade" style={{ width: '30%' }} />
                <Column field="region" header="Região" style={{ width: '25%' }} />
                <Column
                    header="Detalhes"
                    style={{ width: '20%' }}
                    body={(data) => (
                        <Button
                            icon="pi pi-fw pi-eye"
                            label=""
                            text
                            onClick={() => showDetails(data)}
                        />
                    )}
                />
                <Column
                    header="Localização"
                    style={{ width: '15%' }}
                    body={(data) => (
                        <Button
                            icon="pi pi-fw pi-map-marker"
                            label="Ver"
                            className="p-button-success"
                            onClick={() =>
                                window.open(`https://www.google.com/maps?q=${data.latitude},${data.longitude}`, '_blank')
                            }
                        />
                    )}
                />
                <Column
                    header="Ações"
                    style={{ width: '10%' }}
                    body={(data) => (
                        <Button
                            icon="pi pi-fw pi-trash"
                            className="p-button-danger"
                            onClick={() => handleRemoveComunidade(data.id)}
                            tooltip="Remover Comunidade"
                            text
                        />
                    )}
                />
            </DataTable>

            {/* Diálogo com Detalhes */}
            {renderDialog()}

            {/* Botão para adicionar comunidade */}
            <Button
                label=""
                icon="pi pi-fw pi-plus"
                onClick={showAddForm}
                className="p-button-primary"
                style={{ marginTop: '20px' }}
            />

            {/* Diálogo de Adicionar Comunidade */}
            <Dialog
                header="Adicionar Comunidade"
                visible={showAddDialog}
                style={{ width: '50vw' }}
                onHide={() => setShowAddDialog(false)}
                footer={
                    <>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowAddDialog(false)} />
                        <Button
                            label="Adicionar"
                            icon="pi pi-check"
                            onClick={handleAddComunidade}
                            autoFocus
                        />
                    </>
                }
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Nome</label>
                        <InputText
                            id="name"
                            value={newComunidade.name}
                            onChange={(e) => setNewComunidade({ ...newComunidade, name: e.target.value })}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="region">Região</label>
                        <InputText
                            id="region"
                            value={newComunidade.region}
                            onChange={(e) => setNewComunidade({ ...newComunidade, region: e.target.value })}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Descrição</label>
                        <InputTextarea
                            id="description"
                            value={newComunidade.description}
                            onChange={(e) => setNewComunidade({ ...newComunidade, description: e.target.value })}
                            rows={4}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="latitude">Latitude</label>
                        <InputText
                            id="latitude"
                            value={newComunidade.latitude}
                            onChange={(e) => setNewComunidade({ ...newComunidade, latitude: e.target.value })}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="longitude">Longitude</label>
                        <InputText
                            id="longitude"
                            value={newComunidade.longitude}
                            onChange={(e) => setNewComunidade({ ...newComunidade, longitude: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ComunidadeScreen;
