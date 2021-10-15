import React from 'react'
import { useState } from 'react'
// import { useHistory } from 'react-router'
import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import moment from "moment"
import key from './Apikey'

function MyCart() {
    // let pathnames = useLocation()
    const [name, setName] = useState(<><img className="img-fluid body-center" style={{ filter: 'none' }} src="/media/noResultsFound.jpg" /><h1 className=
        "text-center pt-3">There is no Products</h1></>)
    // const [complete, setComplete] = useState()

    // const History = useHistory()
    const callAbout = async () => {
        try {
            const res = await fetch(`${key}/aboutapi`, {
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user:localStorage.getItem("Logdata")
                })
            })

            const data = await res.json();

            if (!res.status === 200 || !data) {
                console.log("Error")
            }
        }
        catch (err) {
            // window.alert("You have to login")
            // History.push("/login")
            console.log(err);
        }
    }
    const callContact = async () => {
        try {
            const res = await fetch(`${key}/gettinguserorder`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user:localStorage.getItem("Logdata")
                })
            })

            const datas = await res.json();
            function getname(val) {
                return <><a href={val.href} target="_blank" rel="noopener noreferrer">{val.name}</a><br /></>
            }
            function ncard(val) {
                function getdates() {
                    var d = moment(new Date, "DD-MM-YYYY")
                    var day = d.format('DD');
                    var month = d.format('MM');
                    var year = d.format('YYYY');
                    return (`${day}/${month}/${year}`)
                  }
                const completeorderbyuse = async () => {
                    try {
                        await fetch(`${key}/completeorder`, {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id: val._id, date: getdates()
                            })
                        })
                    }
                    catch {

                    }
                }
                function Downloads() {
                    if (val.Download === "") {
                        return <h5 style={{ fontSize: 'small' }}>This Order is not completed yet</h5>
                    }
                    else if (val.Download !== "" && val.complete !== true) {
                        return <><a target="_blank" rel="noreferrer" className="btn btn-success" href={val.Download}>Download</a><p className="mt-3">For More Customization Contact in Chat</p>Satisfied with this website ?<br /><button onClick={() => {completeorderbyuse() }} className="btn btn-success">Complete the Order</button></>
                    }
                    else if (val.complete === true) {
                        return <><a href={val.Download} target="_blank" rel="noreferrer" className="btn btn-success">Download</a></>
                    }
                }
                // if (val.complete === false) {
                function Revision() {
                    for (let index = 0; index < datas.length; index++) {
                        const element = datas[index];
                        return element.Revisions.map(getname)
                    }
                }
                function status() {
                    if (val.complete === false) {
                        return (
                            <>
                                <span className="badge badge-primary">Active</span>
                            </>
                        )
                    }
                    else {
                        return (
                            <>
                                <span className="badge badge-success">Completed</span>
                            </>
                        )
                    }
                }
                function data() {
                    if (val.complete === false) {
                        return (<>
                            <span>Deliver will be on {val.dele}</span>
                        </>)
                    }
                    else {
                        return <span>Delvered at {val.dele}</span>
                    }
                }
                function Chat() {
                    if (val.complete === false) {
                        return (<>
                            <span><kbd>{val._id}</kbd><br />Chat at <a href="/chat">this</a></span>
                        </>)
                    }
                    else {
                        return <span>Chat is disabled when the order is completeted</span>
                    }
                }
                function Deleororde(){
                    if(val.complete === false){
                        return <p className="card-text"><small className="text-muted">Delever will be on {val.dele}<br />Ordered at {val.orderedon}</small></p>
                    }
                    else{
                        return <p className="card-text"><small className="text-muted">Delevered on {val.dele}<br />Ordered at {val.orderedon}</small></p>
                    }
                }
                return (
                    <>
                        <div className="body-center card mt-3">
                            <div className="row g-0" style={{ margin: '5px' }}>
                                <div className="col-md-4">
                                    <img src={val.img} width="660px" height="440px" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{val.Name}</h5>
                                        <p className="text-success" style={{ fontSize: "18px" }}>Price - {val.price}₹</p>
                                        <p className="card-text">{val.desc}</p>
                                        {Deleororde()}
                                        <p className="card-text text-right">
                                            <ul style={{ display: 'inline' }} className="social-icons inline-center"><li className="text-right"><a href="#" data-toggle="collapse" href={`#${val._id}`} role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><i className="fa fa-angle-down"></i></a></li></ul></p>
                                    </div>
                                </div>
                            </div>
                            <div id={`${val._id}`} className="collapse" style={{ boxShadow: 'none', margin: '0', padding: '10px' }} aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 mt-3">
                                            <h5><b>Order Status</b></h5>
                                            {status()}
                                            <h5 className="mt-4"><b>Delivery</b></h5>
                                            {data()}
                                            <h5 className="mt-4"><b>Chat Code</b></h5>
                                            {Chat()}
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <h5><b>Revisions</b></h5>
                                            {Revision()}
                                        </div>
                                        <div className="col-md-3 mt-3">
                                            <h5><b>Download</b></h5>
                                            {Downloads()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                // }
            }
            setName(<><div><div><div><div className="row mb-3">{datas.map(ncard)}</div></div></div></div></>)

            if (!res.status === 200 || !datas) {
                const error = new Error(res.error)
                throw error
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callContact()
        callAbout()
    }, [])
    return (
        <form method="GET" className="container-fluid pb-4" style={{ background: '#fff' }}>
            <div className="profile-head">
                {/* <ul className="nav nav-tabs" role="tablist" style={{ marginBottom: '15px' }}>
                    <li className="nav-item"><a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                        role="tab" aria-controls="home" aria-selected="true">Active</a></li>
                    <li className="nav-item"><a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                        role="tab" aria-controls="profile" aria-selected="false">Completed</a></li>
                </ul> */}
                <div className="">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            {name}
                        </div>
                        {/* <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            {complete}
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        </div> */}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MyCart
