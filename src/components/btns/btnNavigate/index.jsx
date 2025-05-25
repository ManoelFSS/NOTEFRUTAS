import { Button } from "./styles"

const BtnNavigate = ({$text, onClick, icon,  $width, $height, $background, $color, $marginTop, $fontSize}) => {
    return (
        <Button 
            type="button"
            onClick={onClick}
            style={{
                width: $width,
                height: $height,
                background: $background,
                color: $color,
                marginTop: $marginTop,
            }}
        >
            {$text}
            {icon}
        </Button>
    )
}

export default BtnNavigate
