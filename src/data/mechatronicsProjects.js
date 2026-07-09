export const mechatronicsProjects = [
  {
    video: '/videos/trackcall.mp4',
    name: 'TrackCall',
    specs: 'Pimoroni Tiny 2040 · C · Pico SDK · Relay',
    content:
      'A track-call limiter for slot car racing. Gives each player 3 calls per race: pressing the button de-energizes the track for a second so they can reset their car, then locks them out with LED feedback once calls run out.',
    github: 'https://github.com/olael94/TrackCall',
  },
  {
    video: '/videos/trackcall_neopixel.mp4',
    name: 'TrackCall NeoPixel',
    specs: 'Pimoroni Tiny 2040 · C · WS2812 NeoPixel · Relay',
    content:
      'An upgraded revision of TrackCall that swaps the three discrete status LEDs for a single WS2812 addressable NeoPixel, driven by a custom PIO program. Same 3-calls-per-race track limiter logic, more compact hardware.',
    github: 'https://github.com/olael94/TrackCall-NeoPixel',
    videoPosition: 'center 10%',
  },
  {
    video: '/videos/pico_rainbow_servo.mp4',
    name: 'Pico Rainbow Servo Dial',
    specs: 'Raspberry Pi Pico · C · Potentiometer · Servo · WS2812',
    content:
      'A potentiometer-controlled analog gauge on the Raspberry Pi Pico. Turning the dial sweeps a servo through its full range while a pair of chained NeoPixels cycle through a 7-color rainbow, both driven off the same ADC reading.',
    github: 'https://github.com/olael94/RaspberryPico-Rainbow-Servo',
  },
  {
    video: '/videos/tiny2040_7seg.mp4',
    name: 'Tiny2040 7-Segment Counter',
    specs: 'Pimoroni Tiny 2040 · C · 74HC595 · 7-Segment Display',
    content:
      'A free-running counter driving a 4-digit common-cathode 7-segment display through a 74HC595 shift register. Multiplexes all four digits fast enough for persistence of vision to read them as simultaneously lit.',
    github: 'https://github.com/olael94/RP-Tiny2040-7seg-counter',
  },
];
