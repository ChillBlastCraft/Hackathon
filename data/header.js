/*
 * Chapter navigation animation timing.
 * Keep this in sync with CSS transition duration in data/header.css.
 */
const CHAPTER_ANIMATION_DURATION_MS = 360

/*
 * Stores timeout IDs per <details> node.
 * Prevents overlapping close timers during rapid clicks.
 */
const closeTimers = new WeakMap()

/*
 * Clears any pending close timer for one chapter.
 * Used before opening/closing so animation state does not conflict.
 */
function clearCloseTimer(detailsElement) {
	const existingTimer = closeTimers.get(detailsElement)
	if (existingTimer) {
		clearTimeout(existingTimer)
		closeTimers.delete(detailsElement)
	}
}

/*
 * Starts the close animation, then removes the native [open] state.
 * The delay lets CSS finish the slide-out transition first.
 */
function closeChapterWithAnimation(detailsElement) {
	if (!detailsElement.open) {
		return
	}

	clearCloseTimer(detailsElement)
	detailsElement.classList.add('is-closing')

	const closeTimer = setTimeout(() => {
		detailsElement.open = false
		detailsElement.classList.remove('is-closing')
		closeTimers.delete(detailsElement)
	}, CHAPTER_ANIMATION_DURATION_MS)

	closeTimers.set(detailsElement, closeTimer)
}

/*
 * Opens a chapter immediately after clearing any close-in-progress state.
 * This keeps fast re-clicks responsive and smooth.
 */
function openChapter(detailsElement) {
	clearCloseTimer(detailsElement)
	detailsElement.classList.remove('is-closing')
	detailsElement.open = true
}

/*
 * Click handler used by summary elements.
 * Only one chapter stays open at a time, with animated transitions.
 */
function toggleChapterSummary(summaryElement, event) {
	event.preventDefault()

	const currentDetails = summaryElement.closest('details')
	const chapterDetails = document.querySelectorAll('.math-chapters details')
	const shouldOpen = !currentDetails.open || currentDetails.classList.contains('is-closing')

	chapterDetails.forEach((detailsElement) => {
		if (detailsElement !== currentDetails) {
			closeChapterWithAnimation(detailsElement)
		}
	})

	if (shouldOpen) {
		openChapter(currentDetails)
		return
	}

	closeChapterWithAnimation(currentDetails)
}
