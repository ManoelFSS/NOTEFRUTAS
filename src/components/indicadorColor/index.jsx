import { Li } from "./styles"

const IndicadorColor = ({color, width, height, text}) => {
    return (
        <Li>
            <span
                style={{
                    backgroundColor: color,
                    width: width,
                    height: height,
                }}
            >
            </span>
            <p>{text}</p>
        </Li>
    )
}

export default IndicadorColor
