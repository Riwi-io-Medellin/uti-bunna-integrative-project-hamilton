export function SkeletonListMatches() {
    const createSkeletonCard = () => 
        `    <div class="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm animate-pulse">
        <div class="flex justify-between items-start mb-4">
            
            <div class="flex gap-3">
                <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full"></div>
                </div>

                <div class="space-y-2">
                    <div class="h-4 w-28 bg-gray-200 rounded"></div>
                    <div class="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>

            <div class="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="h-9 bg-gray-200 rounded-xl"></div>
            <div class="h-9 bg-gray-200 rounded-xl"></div>
        </div>
    </div>`
    
    return `
            <div id="matches-list" class="px-6 space-y-4 pb-24">
                ${createSkeletonCard()}
                ${createSkeletonCard()}
                ${createSkeletonCard()}
                ${createSkeletonCard()}
            </div>
    `
}