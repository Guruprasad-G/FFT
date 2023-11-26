import { useState } from "react";
import { Butterfly } from './Butterfly'
import { Point8DIFFFTorDITIFFT, Point8DITFFTorDIFIFFT } from './EightPoint'
import { Point4DIFFFTorDITIFFT, Point4DITFFTorDIFIFFT } from './FourPoint'
import { complex, conj, multiply, sqrt } from 'mathjs'
import { Container, Row, Col, Spinner, Card, Button, Form  } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'

const Userinputform1 = ({ onChange }) => {
    return (
        <Container style={{color:"inherit"}}>
            <Row xs={2} md={3}>
                <Col xs={4} sm={8} md={12}>
                    {/* <Item> */}
                        <label for="4points"> 4 point Input</label>
                        <input type="radio" value="4" placeholder="DFT" name="points" onChange={onChange} id="4points"></input>
                        <br></br>
                        <label for="8points"> 8 point Input</label>
                        <input type="radio" value="8" placeholder="IDFT" name="points" onChange={onChange} id="8points"></input>
                        {/* </Item> */}
                </Col>
                <Col xs={4} sm={8} md={12}>
                    {/* <Item> */}
                        <label for="FFTtransform">FFT</label>
                        <input type="radio" value="true" placeholder="DFT" name="transform" onChange={onChange} id="FFTtransform"></input>
                        <label for="IFFTtransform">  IFFT</label>
                        <input type="radio" value="false" placeholder="IDFT" name="transform" onChange={onChange} id="IFFTtransform"></input>
                        {/* </Item> */}
                </Col>
                <Col xs={4} sm={8} md={12}>
                    {/* <Item> */}
                        <label>Using DIT or DIF</label>
                        <input type="radio" value="true" placeholder="DIT" name="type" onChange={onChange}></input>
                        <input type="radio" value="false" placeholder="DIF" name="type" onChange={onChange}></input>
                        {/* </Item> */}
                </Col>
            </Row>
        </Container>
    )
}

const Advertisement = ({height, width}) => {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    return (
<Container style={{ height: height, width: width, padding: "0" }}>
  {hasError ? (
    <p>The iframe could not be loaded.</p>
  ) : loading ? (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <Card style={{ height: "100%", width: "100%", padding: "0" }}>
      <Card.Img>
      <iframe title="Embedded Video" src="https://www.youtube.com/embed/ziQ9GURNrUg/" style={{ height: "100%", width: "100%" }} onError={(e) => { setHasError(true); }} onLoad={() => setLoading(false)} ></iframe>
      </Card.Img>
    </Card>
  )}
</Container>

    )
}

const Userinputform2 = ({points, onChange, field1}) => {
    return (
        <>
        {
            points ? points.map((numobject) => {
                return (
                    <Container style={{ alignItems: "center", justifyContent: "center" }}>
  <Row>
    <Col xs="auto" md="auto">
      <br />
      <Form.Label>{`x(${numobject.index}) = `}</Form.Label>
      <Form.Control type="number" name="realinput" defaultValue={0} onChange={onChange} id={numobject.index}/>
      {!field1.transform ? (
        <> + <Form.Control type="number" name="imginput" defaultValue={0} onChange={onChange} id={numobject.index}/>
          <button disabled style={{ color: "black" }}>i</button>
        </>
      ) : null}
    </Col>
  </Row>
</Container>
                )
            }) : null
        }
        </>
    )
}

const Submission = ({onSubmit, errors}) => {
    return (
        <>
        <br></br>
        {errors ? 
                        <p>{errors}</p>
                     : null}
        <Button onClick={onSubmit} style={{ align: "center", marginTop:"5%", alignItems: 'center', justifyContent: 'center' }} variant="contained">Submit</Button>
        </>
    )
}

// const MainPage = () => {
//     const [field1, updatefield1] = useState({ transform: null, type: null })
//     const [realinput, updaterealinput] = useState([])
//     const [imginput, updateimginput] = useState([])
//     const [points, updatepoints] = useState([])
//     const [errors, updateerrors] = useState(null)
//     const [output, updateoutput] = useState(null)
//     const screenWidth = useMediaQuery({ query: '(min-width: 600px)' });
//     const Errors = {
//         PointsError: "Select number of points",
//         TransformError: "Select a transform",
//         TypeError: "Select a type",
//         InputError: "Enter a valid input",
//     }
//     // useEffect(() => {
//     //     console.log("Field1 -", field1)
//     //     console.log("realinput -", realinput)
//     //     console.log("imginput -", imginput)
//     //     console.log("Points -", points)
//     //     console.log("Error -", errors)
//     // }, [field1, realinput, imginput, points, errors])

//     const onChange = (event) => {
//         // console.log("event -",event)
//         // console.log("event.target -",event.target)
//         // console.log("event.target.name -",event.target.name)
//         // console.log("event.target.value -",event.target.value)
//         // console.log("event.target.name -",event.target.name)
//         // console.log("event.target.index -",event.target.index)
//         // console.log("event.target.id -",event.target.id)
//         if (event.target.name === "transform" || event.target.name === "type") {
//             let value = true
//             if (event.target.value === "false")
//                 value = false
//             updatefield1({ ...field1, [event.target.name]: value })
//         }
//         else if (event.target.name === "realinput") {
//             let rarr = realinput
//             rarr[event.target.id] = Number(event.target.value)
//             updaterealinput(rarr)
//             // console.log("Real array -",realinput)
//         }
//         else if (event.target.name === "imginput") {
//             let iarr = imginput
//             iarr[event.target.id] = Number(event.target.value)
//             updateimginput(iarr)
//             // console.log("Imaginary array -",imginput)
//         }
//         else if (event.target.name === "points") {
//             const numberofinputs = Number(event.target.value)
//             const inputarray = []
//             const temparrayreal = []
//             const temparrayimg = []
//             for (var i = 0; i < numberofinputs; i++) {
//                 inputarray.push({ i: 0, index: i })
//                 temparrayreal.push(0)
//                 temparrayimg.push(0)
//             }
//             updatepoints(inputarray)
//             updaterealinput(temparrayreal)
//             updateimginput(temparrayimg)
//         }
//     }

//     const onSubmit = (event) => {
//         event.preventDefault();
//         if (!(points.length > 0)) {
//             updateerrors(Errors.PointsError)
//             return;
//         }
//         if (field1.transform === null) {
//             updateerrors(Errors.TransformError)
//             return;
//         }
//         if (field1.type === null) {
//             updateerrors(Errors.TypeError)
//             return;
//         }
//         if (!(realinput.length > 1)) {
//             updateerrors(Errors.InputError);
//             return;
//         }
//         updateerrors(null);
//         const calcarray = []
//         for (let i = 0; i < points.length; i++) {
//             calcarray.push(complex(realinput[i], imginput[i]))
//         }
//         // console.log("Calc array -", calcarray)
//         const twiddle = [1, multiply(complex(1, -1), (1 / sqrt(2))), complex(0, -1), multiply(complex(-1, -1), (1 / sqrt(2)))]
//         const twiddle_conjugate = [twiddle[0], conj(twiddle[1]), conj([twiddle[2]]), conj([twiddle[3]])]

//         let w = []
//         if (field1.transform)
//             w = twiddle_conjugate
//         else
//             w = twiddle
//         const x = calcarray
//         // console.log("Input given ->", x)
//         // console.log("points given ->",points.length)
//         if (points.length === 8) {
//             // console.log("8 Points")
//             var output = field1.type ? Point8DITFFTorDIFIFFT(x, w, field1.transform) : Point8DIFFFTorDITIFFT(x, w, field1.transform)
//         }
//         else
//             output = field1.type ? Point4DITFFTorDIFIFFT(x, w, field1.transform) : Point4DIFFFTorDITIFFT(x, w, field1.transform)
//         // console.log("Output == ", output)
//         updateoutput(output)
//     }
//     if(screenWidth)
//     return (
//         <>
//             <Container style={{ display: "flex", marginTop: "5%", padding: "2% 0% 2%" }}>
//                 <Advertisement height="600px" width="20%"></Advertisement>
//                 <Container style={{ height: "100%", width: "60%", sx: "auto", md: "auto" }}>
//                     <Card style={{ height: "50%", marginTop: "2%", paddingTop: "2%", sx: "auto", md: "auto" }}>
//                         <Userinputform1 onChange={onChange}></Userinputform1>
//                         {/* <Item> */}
//                             <Userinputform2 points={points} onChange={onChange} field1={field1}></Userinputform2>
//                             <Submission onSubmit={onSubmit} errors={errors}></Submission>
//                         {/* </Item> */}
//                     </Card>
//                     <br></br>
//                     <Card style={{ height: "100%", width:"100%",alignItems: "center", justifyContent: "center" }}>
//                         <Container style={{ height:"100%", width:"100%"}}>
//                             <Butterfly val={output}></Butterfly>
//                         </Container>
//                     </Card>
//                 </Container>
//                 <Advertisement height="600px" width="20%"></Advertisement>
//             </Container>
//         </>
//     )
//     else
//         return (
//             <>
//                 <Container style={{ display: "flex", marginTop: "18%", padding: "2% 0% 2%" }}>
//                     <Advertisement height="250px" width="250px"></Advertisement>
//                 </Container>
//                 <Container style={{ height: "100%", width: "100%", sx: "auto", md: "auto" }}>
//                     <Card style={{ height: "100%", marginTop: "2%", paddingTop: "2%", sx: "auto", md: "auto" }}>
//                         <Userinputform1 onChange={onChange}></Userinputform1>
//                     </Card>
//                     {/* <Item> */}
//                         <Userinputform2 points={points} onChange={onChange} field1={field1}></Userinputform2>
//                         <Submission onSubmit={onSubmit} errors={errors}></Submission>
//                     {/* </Item> */}
//                 </Container>
//                 <br></br>
//                 <Advertisement height="250px" width="250px"></Advertisement>
//                 <br></br>
//                     <Card style={{ height: "300px", width:"100%",alignItems: "center", justifyContent: "center"}}>
//                         <Container style={{ height:"100%", width:"100%", align:"center"}}>
//                             <Butterfly val={output}></Butterfly>
//                         </Container>
//                     </Card>
//             </>
//         )
// }

const MainPage = () => {
    return (
        <>
        <h1> Hello there!!</h1>
        </>
    )
}

export default MainPage
