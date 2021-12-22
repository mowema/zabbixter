/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React from 'react';
import "../styles/hosts.css"

interface IItem {
    name: string;
    description: string;
    status: string;
}

interface IHost {
    hostid: number;
    name: string;
    host: string;
    items: IItem[];
}


interface AuthResponse {
    result: String;
}

interface DataResponse {
    result: [];
}

const listHosts: IHost[] = []
const auth: String = "";;
const token: String = "";


function Hosts() {

    const [auth, setToken] = React.useState(token);
    const [hosts, setHosts]: [IHost[], (hosts: IHost[]) => void] = React.useState(listHosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    React.useEffect(() => {
        axios
            .post("http://zabbix.demonubiral.com/api_jsonrpc.php", {
                "jsonrpc": "2.0",
                "method": "user.login",
                "params": {
                    "username": "interview_test",
                    "password": "1nt3rv13w"
                },
                "id": 1
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                const res: AuthResponse = response.data
                setToken(res.result)
                setLoading(false);

                axios
                    .post<DataResponse>("http://zabbix.demonubiral.com/api_jsonrpc.php", {
                        "jsonrpc": "2.0",
                        "method": "host.get",
                        "params": {
                            "output": ["name", "host"], "selectItems": ["name", "description", "status"],
                            "selectGroups": "extend"

                        },
                        "auth": res.result,
                        "id": 1
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        const res = response.data
                        setHosts(res.result);
                        setLoading(false);
                    });
            });
    }, []);

    return (
        <div className="box">
            <h1>Hosts & Items</h1>
            {!hosts ? "loading..." : hosts.map((host) => {
                return (
                    <div key={host.hostid} className="card">
                        <h4>{host.name}</h4>
                        <h5>{host.host}</h5>
                        <dl>
                            <dt>Items activos de la instancia:</dt>
                            {host.items.map((item: IItem) => {
                                if (item.status === "1") return (<dd>{item.name} </dd>)
                                return (<></>)
                            }
                            )}
                        </dl>
                    </div>
                )
            })}
        </div>
    );
}

export default Hosts;