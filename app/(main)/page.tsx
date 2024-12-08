/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';



const lineData: ChartData = {
    labels: ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
        {
            label: 'Usuários de aplicativo',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Usuários de SMS',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const usersData = [
        { 
            id: 1, 
            name: 'João Silva', 
            category: 'App', 
            email: 'joao.silva@email.com', 
            phone: '842345678', 
            status: 'Ativo' 
        },
        { 
            id: 2, 
            name: 'Maria Santos', 
            category: 'App SMS', 
            email: 'maria.santos@email.com', 
            phone: '843456789', 
            status: 'Inativo' 
        },
        { 
            id: 3, 
            name: 'Carlos Mendes', 
            category: 'App', 
            email: 'carlos.mendes@email.com', 
            phone: '845678901', 
            status: 'Ativo' 
        },
        { 
            id: 4, 
            name: 'Ana Lopes', 
            category: 'App SMS', 
            email: 'ana.lopes@email.com', 
            phone: '846789012', 
            status: 'Ativo' 
        },
        { 
            id: 5, 
            name: 'Pedro Costa', 
            category: 'App', 
            email: 'pedro.costa@email.com', 
            phone: '848901234', 
            status: 'Inativo' 
        },
        { 
            id: 6, 
            name: 'Luisa Ferreira', 
            category: 'App SMS', 
            email: 'luisa.ferreira@email.com', 
            phone: '849012345', 
            status: 'Ativo' 
        },
        { 
            id: 7, 
            name: 'Antonio Joao', 
            category: 'App', 
            email: 'Antonio@email.com', 
            phone: '849012345', 
            status: 'Ativo' 
        }
    ];
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const initialUsers = [
        { id: 1, name: 'João Silva', category: 'App', email: 'joao.silva@email.com', phone: '842345678', status: 'Ativo' },
        { id: 2, name: 'Maria Santos', category: 'App SMS', email: 'maria.santos@email.com', phone: '843456789', status: 'Inativo' },
        { id: 3, name: 'Carlos Mendes', category: 'App', email: 'carlos.mendes@email.com', phone: '845678901', status: 'Ativo' },
        { id: 4, name: 'Ana Lopes', category: 'App SMS', email: 'ana.lopes@email.com', phone: '846789012', status: 'Ativo' },
        { id: 5, name: 'Pedro Costa', category: 'App', email: 'pedro.costa@email.com', phone: '848901234', status: 'Inativo' },
        { id: 6, name: 'Luisa Ferreira', category: 'App SMS', email: 'luisa.ferreira@email.com', phone: '849012345', status: 'Ativo' },
        { id: 7, name: 'Antonio Joao', category: 'App', email: 'antonio.joao@email.com', phone: '849012345', status: 'Ativo' }
    ];

    // Estado para os usuários e o filtro
    const [users, setUsers] = useState(initialUsers);
    const [globalFilter, setGlobalFilter] = useState('');

    // Função de filtro por nome
    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilter(value);
    
        if (value) {
            const filteredUsers = initialUsers.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
            );
            setUsers(filteredUsers);
        } else {
            setUsers(initialUsers);
        }
    };
    

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);
    

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Usu. do aplicativo</span>
                            <div className="text-900 font-medium text-xl">152</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-fw pi-users text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 novos </span>
                    <span className="text-500">na ult. sem.</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Locais remotos</span>
                            <div className="text-900 font-medium text-xl">10</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">alcançados</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Missionarios</span>
                            <div className="text-900 font-medium text-xl">28</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-fw pi-users text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">5 </span>
                    <span className="text-500">novos</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Usu. da app sms</span>
                            <div className="text-900 font-medium text-xl">15</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">10 </span>
                    <span className="text-500">novos</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
            <div className="card">
            <h3>Lista de Usuários</h3>

            {/* Campo de filtro */}
            <div style={{ marginBottom: '1rem' }}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        placeholder="Filtrar por nome"
                        value={globalFilter}
                        onChange={onFilter}
                        style={{ width: '300px' }}
                    />
                </span>
            </div>


            <DataTable value={users} rows={5} paginator responsiveLayout="scroll">

                <Column field="name" header="Nome" sortable style={{ width: '50%' }} />
                <Column field="category" header="Categoria" sortable style={{ width: '30%' }} />
                <Column field="phone" header="Telefone" sortable style={{ width: '30%' }} />
                <Column
                    header="Detalhes"
                    style={{ width: '20%' }}
                    body={(data) => (
                        <Button
                            icon="pi pi-fw pi-eye"
                            text
                            onClick={() =>
                                alert(
                                    `Detalhes de ${data.name}:\nEmail: ${data.email}\nTelefone: ${data.phone}\nStatus: ${data.status}`
                                )
                                // <div style={{position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                //     <table border={1} style={{borderCollapse: "collapse", backgroundColor: "white"}}>
                                //         <thead>
                                //             <th>
                                //                 Nome
                                //             </th>
                                //             <th>
                                //                 Email
                                //             </th>
                                //             <th>
                                //                 Telefone
                                //             </th>
                        
                                //         </thead>

                                //         <tr>
                                //             <td>
                                //                 {data.name}
                                //             </td>
                                //             <td>
                                //                 {data.email}
                                //             </td>
                                //             <td>
                                //                 {data.phone}
                                //             </td>
                                //         </tr>
                                //     </table>
                                // </div>
                            }
                        />
                    )}
                />
            </DataTable>
        </div>
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Destaques e Desempenho</h5>
                        {/* <div>
                            <Button type="button" icon="pi pi-ellipsis-v" rounded text className="p-button-plain" onClick={(event) => menu1.current?.toggle(event)} />
                            <Menu
                                ref={menu1}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div> */}
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Francisco Manue</span>
                                <div className="mt-1 text-600">App</div>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-orange-500 h-full" style={{ width: '50%' }} />
                                </div>
                                <span className="text-orange-500 ml-3 font-medium">%50</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Antonio Joao</span>
                                <div className="mt-1 text-600">App</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-cyan-500 h-full" style={{ width: '16%', backgroundColor: "red" }} />
                                </div>
                                <span className="text-cyan-500 ml-3 font-medium">%16</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Renata José</span>
                                <div className="mt-1 text-600">App sms</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-pink-500 h-full" style={{ width: '67%' }} />
                                </div>
                                <span className="text-pink-500 ml-3 font-medium">%67</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Francica João</span>
                                <div className="mt-1 text-600">Office</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-green-500 h-full" style={{ width: '35%' }} />
                                </div>
                                <span className="text-green-500 ml-3 font-medium">%35</span>
                            </div>
                        </li>
                        
                        
                    </ul>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Visão geral</h5>
                    <hr />
                    <h6>
                        Gráfico de progressão
                    </h6>
                    <hr />
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>Notificações</h5>
                        {/* <div>
                            <Button type="button" icon="pi pi-ellipsis-v" rounded text className="p-button-plain" onClick={(event) => menu2.current?.toggle(event)} />
                            <Menu
                                ref={menu2}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div> */}
                    </div>

                    <span className="block text-600 font-medium mb-3">HOJE</span>
                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-fw pi-heart text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Francisca João
                                <span className="text-700">
                                    {' '}
                                    Aderiu a plataforma 
                                    {/* <span className="text-blue-500">79$</span> */}
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-fw pi-globe text-xl text-orange-500" />
                            </div>
                            <span className="text-700 line-height-3">
                                Nova comunidade identificado ao sul de Moçambique
                            </span>
                        </li>
                    </ul>

                    <span className="block text-600 font-medium mb-3">Anteriores</span>
                    <ul className="p-0 m-0 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-fw pi-calendar text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Live marcada para 07 de Janeiro de 2025
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-question text-xl text-pink-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Novas funcionalidade
                            </span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;
