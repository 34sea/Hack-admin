'use client';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { jsPDF } from 'jspdf'; // Importa jsPDF para criar o PDF

// Tipo de Missionário ou Crente Necessitado
interface MissionaryOrBeliever {
    id: number;
    name: string;
    amount: number;
}

// Função de formatação de moeda
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-MZ', {
        style: 'currency',
        currency: 'MZN',
    }).format(value);
};

const FinancialManagement = () => {
    // Dados fictícios para missionários, crentes e doadores
    const [missionaries, setMissionaries] = useState<MissionaryOrBeliever[]>([
        { id: 1, name: 'Jose Silva', amount: 0 },
        { id: 2, name: 'Maria Souza', amount: 0 },
        { id: 3, name: 'Carlos Oliveira', amount: 0 },
    ]);

    const [believers, setBelievers] = useState<MissionaryOrBeliever[]>([
        { id: 1, name: 'João Silva', amount: 0 },
        { id: 2, name: 'Maria Santos', amount: 0 },
        { id: 3, name: 'Carlos Mendes', amount: 0 },
    ]);

    const [donors, setDonors] = useState([
        { id: 1, name: 'Silva João Silva', amount: 100, category: 'Missionários' },
        { id: 2, name: 'Luisa Maria Oliveira', amount: 150, category: 'Crentes Necessitados' },
        { id: 3, name: 'Francisco Pedro Santos', amount: 200, category: 'Missionários' },
    ]);

    // Estado para controle de pop-up
    const [showAddAmountDialog, setShowAddAmountDialog] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState<MissionaryOrBeliever | null>(null); // O destinatário (Missionário ou Crente)
    const [newAmount, setNewAmount] = useState(''); // Novo valor a ser adicionado
    const [recipientType, setRecipientType] = useState(''); // Tipo de destinatário (Missionário ou Crente)

    const categories = [
        { name: 'Missionários', code: 'Missionários' },
        { name: 'Crentes Necessitados', code: 'Crentes Necessitados' },
    ];

    // Função para adicionar valores aos missionários ou crentes
    const addAmount = () => {
        const amountToAdd = parseFloat(newAmount);
        if (recipientType === 'Missionário' && selectedRecipient) {
            const updatedMissionaries = missionaries.map(missionary =>
                missionary.id === selectedRecipient.id
                    ? { ...missionary, amount: missionary.amount + amountToAdd }
                    : missionary
            );
            setMissionaries(updatedMissionaries);
        } else if (recipientType === 'Crente' && selectedRecipient) {
            const updatedBelievers = believers.map(believer =>
                believer.id === selectedRecipient.id
                    ? { ...believer, amount: believer.amount + amountToAdd }
                    : believer
            );
            setBelievers(updatedBelievers);
        }
        setShowAddAmountDialog(false); // Fecha o pop-up após adicionar o valor
    };

    // Função para gerar o relatório em PDF
    const generateReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Relatório de Doações e Gastos', 20, 20);
        
        let y = 30;

        // Tabela de doadores
        doc.setFontSize(12);
        doc.text('Doadores:', 20, y);
        y += 10;
        donors.forEach(donor => {
            doc.text(`${donor.name} - ${formatCurrency(donor.amount)} - Categoria: ${donor.category}`, 20, y);
            y += 10;
        });

        // Tabela de missionários
        y += 10;
        doc.text('Missionários:', 20, y);
        y += 10;
        missionaries.forEach(missionary => {
            doc.text(`${missionary.name} - Total Recebido: ${formatCurrency(missionary.amount)}`, 20, y);
            y += 10;
        });

        // Tabela de crentes
        y += 10;
        doc.text('Crentes Necessitados:', 20, y);
        y += 10;
        believers.forEach(believer => {
            doc.text(`${believer.name} - Total Recebido: ${formatCurrency(believer.amount)}`, 20, y);
            y += 10;
        });

        // Salva o PDF
        doc.save('relatorio-doacoes.pdf');
    };

    return (
        <div className="container">
            <h2>Gestão Financeira</h2>

            {/* Tabela de Doadores */}
            <div className="section">
                <h3>Doadores</h3>
                <DataTable value={donors} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Nome" sortable />
                    <Column field="amount" header="Valor Doado (MZN)" body={(data) => formatCurrency(data.amount)} sortable />
                    
                    <Column
                        header="Ações"
                        body={(rowData) => (
                            <Button
                                label=""
                                icon="pi pi-plus"
                                onClick={() => {
                                    setRecipientType(rowData.category === 'Missionários' ? 'Missionário' : 'Crente');
                                    setSelectedRecipient(rowData); // Define o doador selecionado
                                    setShowAddAmountDialog(true); // Abre o pop-up
                                }}
                            />
                        )}
                    />
                </DataTable>
            </div>

            {/* Tabela de Missionários */}
            <div className="section" style={{marginTop: "20px"}}>
                <h3>Missionários</h3>
                <DataTable value={missionaries} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Nome" sortable />
                    <Column field="amount" header="Valor Recebido (MZN)" body={(data) => formatCurrency(data.amount)} sortable />
                    <Column
                        header="Ações"
                        body={(rowData) => (
                            <Button
                                label=""
                                icon="pi pi-plus"
                                onClick={() => {
                                    setRecipientType('Missionário');
                                    setSelectedRecipient(rowData); // Define o missionário selecionado
                                    setShowAddAmountDialog(true); // Abre o pop-up
                                }}
                            />
                        )}
                    />
                </DataTable>
            </div>

            {/* Tabela de Crentes Necessitados */}
            <div className="section">
                <h3 style={{marginTop: "15px"}}>Crentes Necessitados</h3>
                <DataTable value={believers} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Nome" sortable />
                    <Column field="amount" header="Valor Recebido (MZN)" body={(data) => formatCurrency(data.amount)} sortable />
                    <Column
                        header="Ações"
                        body={(rowData) => (
                            <Button
                                label=""
                                icon="pi pi-plus"
                                onClick={() => {
                                    setRecipientType('Crente');
                                    setSelectedRecipient(rowData); // Define o crente selecionado
                                    setShowAddAmountDialog(true); // Abre o pop-up
                                }}
                            />
                        )}
                    />
                </DataTable>
            </div>

            <Button label="Gerar Relatório" icon="pi pi-print" onClick={generateReport} style={{marginTop: "15px", marginBottom: "15px"}} />

            {/* Diálogo para adicionar valores aos missionários ou crentes */}
            <Dialog
                header={`Adicionar valor para ${recipientType} ${selectedRecipient?.name}`}
                visible={showAddAmountDialog}
                onHide={() => setShowAddAmountDialog(false)}
            >
                <div className="p-grid">
                    <div className="p-col-12">
                        <label htmlFor="amount">Valor a Adicionar (MZN)</label>
                        <InputText
                            id="amount"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            required
                            type="text"
                        />
                    </div>
                    <div className="p-col-12" style={{ marginTop: '20px' }}>
                        <Button label="" icon="pi pi-check" onClick={addAmount} style={{marginRight: "5px"}} />
                        <Button label="" icon="pi pi-times" onClick={() => setShowAddAmountDialog(false)} className="p-button-secondary" style={{backgroundColor: "#C41E3A", border: "1px solid #C41E3A"}} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default FinancialManagement;




