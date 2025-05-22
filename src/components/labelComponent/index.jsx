import { Label } from "./styles"

const LabelComponent = ({$text, $htmlFor}) => {
    return (
        <Label 
            htmlFor={$htmlFor} 
        >
            {$text}
        </Label>
    )
}

export default LabelComponent
