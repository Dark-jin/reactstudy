import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';

function Detail(props) {

    let {id} = useParams();
    let 찾은상품 = props.items.find(x=>x.id == id);
    let [alert, setalert] = useState(true)
    let [탭, 탭변경] = useState(0)

    useEffect(()=>{
        let a = setTimeout(()=> { setalert(false) },2000)
        
        return ()=>{
            clearTimeout(a)
        }
    }, [])

    return (
        <div className="container">
            {
                alert == true
                ?  <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                <img src= {'/toy1.jpg'} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="/link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭}/>

        </div> 
    );
}
function TabContent(props) {

    let [fade, setfade] = useState('')
    useEffect(()=>{
        setTimeout(()=>{setfade('end') }, 100)
        
        return() =>{
            setfade('')
        }
    },[props])

    if (props.탭 == 0) {
        return <div className={'start '+fade}>내용0</div>
    }
    else if (props.탭 == 1) {
        return <div className={'start '+fade}>내용1</div>
    }
    else if (props.탭 == 2) {
        return <div className={'start '+fade}>내용2</div>
    }
}


export default Detail;