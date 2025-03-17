
import _header from '../Asset/css/_header.module.css'
import _container from '../Asset/css/_container.module.css'
import logo from '../Asset/image/logo_tnc.png'

function Footer (){
return(
    <div>
        <div className={_header.header}>
            <div className={_container.container}>
                <div className={_header.header_container}>
                    
                    <div className="d-flex gap-1" style={{
                        color: 'white',
                        margin: '20px 0px'
                    }}>
                        <div className={_header.logo_container}>
                            <img className={_header.logo} src={logo} alt=''/>
                        </div>
                        <div style={{
                            margin: '0px 5px'
                        }}>
                            <b style={{
                                margin: '10px 0px'
                            }}>Giới Thiệu Trọng Nghĩa Computer</b>
                        </div>
                        <div style={{
                            margin: '0px 5px'
                        }}>
                            <b>Hỗ Trợ khách hàng</b>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0px'
                            }}>
                                <li>Tra cứu đơn hàng</li>
                                <li>Hướng dẫn thanh toán</li>
                            </ul>
                        </div>
                        <div style={{
                            margin: '0px 5px'
                        }}>
                            <b>Chính sách chung</b>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0px'
                            }}>
                                <li>Chính sách, quy định chung</li>
                                <li>Chính sách bảo hành</li>
                                <li>Chính sách hàng chính hãng</li>
                                <li>Chính sách giao hàng</li>
                                <li>Bảo mật thông tin khách hàng</li>
                            </ul>
                        </div>
                        <div style={{
                            margin: '0px 5px'
                        }}>
                            <b>Thông tin khuyến mãi</b>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0px'
                            }}>
                                <li>Tra cứu đơn hàng</li>
                                <li>Hướng dẫn thanh toán</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Footer;