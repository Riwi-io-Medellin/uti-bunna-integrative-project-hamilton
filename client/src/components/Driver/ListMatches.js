import { CardMatch } from "./CardMatch.js"

function ListMatches(matchesList) {
    
    return `
    <div class="px-6 space-y-4 pb-24 overflow-y-auto">
            
            ${matchesList.map(match => CardMatch(match)).join('')}

        </div>
    `
}

export default ListMatches

