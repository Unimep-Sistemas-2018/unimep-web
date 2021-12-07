import header from "./header.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"

export default function Header() {

    const data = new Date()
    const mes = data.toLocaleString('default', { month: 'numeric' })
    const ano = data.toLocaleString('default', { year: 'numeric' })
    return (
        <header className={header.mainContainer}>
            <div className={header.cardHeader}>
                <div className="row">
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 d-flex">
                        <div className={header.alinha_logo}>
                            <img src="/logo.png" className="rounded-circle mr-5" style={{ height: "50px", width: "50px", marginRight: "10px" }} />
                            <span className={header.nomeEmpresa}>Unifinan</span>
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
                        <div className={"row mt-3"}>
                            
                            <div className="col-4 col-md-4 col-lg-4 col-xl-4">
                                <Link href="/home">
                                    <a className={header.links}>Visão Geral</a>
                                </Link>
                            </div>
                            <div className="col-4 col-md-4 col-lg-4 col-xl-4">
                                <Link href="/categorias">
                                    <a className={header.links}>Categorias</a>
                                </Link>
                            </div>
                            <div className="col-4 col-md-4 col-lg-4 col-xl-4">
                                <Link href={"./relatorios?conta=1&mes=" + mes + "&ano=" + ano + "&pagina=0&itensPorPagina=100"}>
                                    <a className={header.links}>Relatórios</a>
                                </Link>
                            </div>


                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-end">
                        <div>
                            {/* <img src="/user-icon.png" className={header.headerIcon} /> */}
                            <Link href="/">
                                <img src="/logout.png" className={header.headerIcon} /> 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
