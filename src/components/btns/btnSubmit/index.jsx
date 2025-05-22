import { Button } from "./styles"

const BtnSubmit = ({$text,$typeText, $marginTop, onClick, $disabled, $opacity, $timer }) => {
    return (
        <Button 
            type={$typeText}
            style={{marginTop: $marginTop, opacity: `${$opacity ? "0.8" : "1"}` }}
            onClick={onClick}
            disabled={$disabled}
        >
            {$text} 
            <span>{$disabled ? `${ $timer }s` : ""}</span>
        </Button>
    )
}

export default BtnSubmit
