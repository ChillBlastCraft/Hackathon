/*
 * All subjects and their exercise sets.
 * Each subject maps to one collapsible section on the page.
 * - id:        Matches the HTML element IDs (details-{id}, grid-{id}, no-results-{id}).
 * - label:     Display name shown in the section header.
 * - exercises: List of topic cards for that subject.
 *   - id:      Unique numeric identifier across all subjects.
 *   - topic:   Display name shown on the card.
 *   - count:   Number of individual exercises in the set.
 *   - chapter: Parent chapter used for grouping and search filtering.
 */
const SUBJECTS = [
    {
        id: 'math1',
        label: 'Math 1',
        exercises: [
            // Chapter 1: Numbers
            { id: 1,  topic: 'Introduction to Numbers', count: 5, chapter: 'Numbers'     },
            { id: 2,  topic: 'Natural Numbers',         count: 4, chapter: 'Numbers'     },
            { id: 3,  topic: 'Integers',                count: 6, chapter: 'Numbers'     },
            { id: 4,  topic: 'Fractions & Decimals',    count: 5, chapter: 'Numbers'     },

            // Chapter 2: Algebra
            { id: 5,  topic: 'Algebraic Expressions', count: 4, chapter: 'Algebra'     },
            { id: 6,  topic: 'Linear Equations',      count: 6, chapter: 'Algebra'     },
            { id: 7,  topic: 'Inequalities',          count: 5, chapter: 'Algebra'     },
            { id: 8,  topic: 'Polynomials',           count: 4, chapter: 'Algebra'     },

            // Chapter 3: Geometry
            { id: 9,  topic: 'Points, Lines & Planes', count: 5, chapter: 'Geometry'     },
            { id: 10, topic: 'Angles',                 count: 6, chapter: 'Geometry'     },
            { id: 11, topic: 'Triangles',              count: 5, chapter: 'Geometry'     },
            { id: 12, topic: 'Area & Perimeter',       count: 4, chapter: 'Geometry'     },
        ]
    },
    {
        id: 'math2',
        label: 'Math 2',
        exercises: [
            // Chapter 1: Functions
            { id: 13, topic: 'Introduction to Functions', count: 5, chapter: 'Functions'    },
            { id: 14, topic: 'Linear Functions',          count: 4, chapter: 'Functions'    },
            { id: 15, topic: 'Quadratic Functions',       count: 6, chapter: 'Functions'    },
            { id: 16, topic: 'Domain & Range',            count: 5, chapter: 'Functions'    },

            // Chapter 2: Trigonometry
            { id: 17, topic: 'Right Triangle Trig', count: 5, chapter: 'Trigonometry' },
            { id: 18, topic: 'The Unit Circle',     count: 4, chapter: 'Trigonometry' },
            { id: 19, topic: 'Sine & Cosine Rules', count: 6, chapter: 'Trigonometry' },
            { id: 20, topic: 'Trig Identities',     count: 5, chapter: 'Trigonometry' },

            // Chapter 3: Probability
            { id: 21, topic: 'Basic Probability',       count: 4, chapter: 'Probability'  },
            { id: 22, topic: 'Counting Principles',     count: 5, chapter: 'Probability'  },
            { id: 23, topic: 'Conditional Probability', count: 4, chapter: 'Probability'  },
            { id: 24, topic: 'Statistics & Data',       count: 6, chapter: 'Probability'  },
        ]
    }
]

/*
 * Returns the total number of exercise sets across all subjects.
 */
function totalExerciseCount() {
    let total = 0
    for (const subject of SUBJECTS) {
        total += subject.exercises.length
    }
    return total
}

/*
 * Rebuilds every subject grid filtered by the search string.
 * Matches against both topic and chapter name, case-insensitively.
 * When a search is active, sections with matching results are auto-opened
 * so the user does not miss hits in a collapsed section.
 */
function renderAll(filter) {
    const lower = filter.trim().toLowerCase()

    for (const subject of SUBJECTS) {
        const grid      = document.getElementById('grid-'        + subject.id)
        const noResults = document.getElementById('no-results-'  + subject.id)
        const details   = document.getElementById('details-'     + subject.id)

        /*
         * When a filter is active, keep only exercises whose topic or chapter
         * contains the search string. Otherwise show the full subject list.
         */
        let visible
        if (lower) {
            visible = subject.exercises.filter(ex =>
                ex.topic.toLowerCase().includes(lower) ||
                ex.chapter.toLowerCase().includes(lower)
            )
        } else {
            visible = subject.exercises
        }

        /*
         * Auto-open any section that has matching results so the user
         * does not miss hits inside a collapsed section.
         */
        if (lower && visible.length > 0) {
            details.open = true
        }

        /*
         * Build card HTML for every visible exercise and inject it into the grid.
         * Using innerHTML here is safe because all values come from the hardcoded
         * SUBJECTS array above, not from user input.
         */
        grid.innerHTML = visible.map(ex => `
            <div class="exercise-card">
                <span class="card-chapter">${ex.chapter}</span>
                <h3>${ex.topic}</h3>
                <p class="exercise-count">${ex.count} exercises</p>
                <a href="#" class="open-btn">Open exercises</a>
            </div>
        `).join('')

        noResults.hidden = visible.length > 0
    }
}

/*
 * Once the DOM is ready, set the total count in the progress badge,
 * render all grids, then wire up the live search input.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-count').textContent = totalExerciseCount()

    renderAll('')

    // Re-render on every keystroke so results update without pressing Enter.
    document.getElementById('exercise-search').addEventListener('input', e => {
        renderAll(e.target.value)
    })
})
