import './ChooseDog.css'

export default function Chooser(props) {
    return (
        <>
            <div className="chooseable-dogs">
                {
                    props.dogs.map( (el) => {
                        return <div style={{backgroundImage: `url(${el})`}} className="choosable"></div>
                    })
                }
            </div>
        </>
    )
}