import header from "./header.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header() {
    return (
        <header className={header.mainContainer}>
            <div className={header.cardHeader}>
                <div className="row">
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 d-flex">
                        <div className={header.alinha_logo}>
                            <img src="/logo.png" className="rounded-circle mr-5" style={{height: "50px", width: "50px", marginRight: "10px"}}/>
                            <span className={header.nomeEmpresa}>Unifinan</span>
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
                        <div className={"row mt-3"}>
                            <div className="col-6 col-md-6 col-lg-6 col-xl-6"><a className={header.links} href={""}>Visão</a></div>
                            <div className="col-6 col-md-6 col-lg-6 col-xl-6"><a className={header.links} href={""}>Relatórios</a></div>
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-end">
                        <div>
                            {/* <img src="/user-icon.png" className={header.headerIcon} /> */}
                            <a href="/"><img src="/logout.png" className={header.headerIcon} /> </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
