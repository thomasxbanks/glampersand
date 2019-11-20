const ampersand = document.querySelector('.ampersand')
const inputs = [...ampersand.querySelectorAll('input.input')]
const inputsTop = [...ampersand.querySelectorAll('.turnip.top input.input')]
const inputsBottom = [...ampersand.querySelectorAll('.turnip.bottom input.input')]
const displayHolderTop = document.querySelector('.turnip.top.display')
const displayHolderBottom = document.querySelector('.turnip.bottom.display')

const charactersRemaining = event => {
  const { target } = event
  const maxlen = parseInt(target.getAttribute('maxlength'))
  const count = parseInt(target.value.length)
  target.nextElementSibling.innerText = (maxlen - count)
}

const populateOutput = event => {
  const { target } = event
  ampersand.querySelector(`p[data-id="${target.dataset.id}"]`).innerHTML = target.value
}

const buildDisplay = input => {
  const paragraph = document.createElement('p')
  paragraph.dataset.id = input.dataset.id
  paragraph.innerText = input.dataset.placeholder
  paragraph.classList = input.classList
  paragraph.style.width = input.style.width
  return paragraph
}

inputs.forEach(input => {
  input.dataset.id = input.parentElement.dataset.id
  input.setAttribute('maxlength', input.dataset.placeholder.length)
  input.setAttribute('placeholder', input.dataset.placeholder)
  input.nextElementSibling.innerHTML = input.dataset.placeholder.length
  input.style.width = `${input.dataset.placeholder.length}ch`
  input.addEventListener('keyup', event => {
    charactersRemaining(event)
    populateOutput(event)
  })
})

inputsTop.forEach(input => {
  displayHolderTop.insertAdjacentElement('beforeend', buildDisplay(input))
})
inputsBottom.forEach(input => {
  displayHolderBottom.insertAdjacentElement('beforeend', buildDisplay(input))
})