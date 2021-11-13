/**
 * Example is the servo that rotates the arm has a variable called rotate-servo-num. It has the value 0. So the rotate servo needs to be plugged into the "0" pins on the motor board.
 */
/**
 * the numbers on the right side of each of these needs to be the same as the slot or connector number on the micro-bit motor board.
 */
// There are 12 keys on this 12 keys on this keypad.. We need numbers for the '*' key and the '#' key.
// '*'  will be 10
// '#'  will be 12
// The "return" instruction will return the number inside the circle to the instruction that called the function.
function read_keyboard () {
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 1)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    // P1 row with the 4 on it
    // P1
    // P1
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 5
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 2
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 8
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        return 0
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 0)
    // set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digitalWritePin(DigitalPin.P16, 1)
    // P1 row with the 4 on it
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 4
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 1
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 7
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        // same as * key
        return 10
    }
    // set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digitalWritePin(DigitalPin.P16, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 1)
    // P1 row with the 4 on it
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 6
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 3
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 9
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        // same as # key
        return 11
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    return 99
}
function MoveServo (servo_num: number, how_far: number, how_fast: number) {
    ServoBit.moveServo(servo_num, how_far, how_fast)
    ServoBit.waitServo(servo_num)
}
function Check_Keyboard (num: number) {
    while (num == 1) {
        basic.showNumber(read_keyboard())
        basic.pause(100)
        basic.clearScreen()
    }
}
let UpDnNum = 1
let InOutNum = 2
let ClawNum = 3
let speed_3 = 300
let speed_2 = 200
let speed_1 = 100
ServoBit.centreServos()
// this is the key board number assigned to open claw. It can be changed of you want a different key to open claw.
// This is the same for all the  arm commands , like ROTATE CLOCKWISE.
// If you want to make ROTATE to be key 2 for example you would set ROTATE CLOCKWISE to 2.
let ClawOpen = 5
let ClawClose = 2
let ROTATE_CW = 1
let RotCCW = 4
let armup = 6
let armdown = 3
let armin = 7
let arm_out = 10
// Each time through the forever loop all 12 keys are checked for someone pressing a key.
// When the key is pressed the position of the servo is measured. In other words if the up/down arm key is pressed the position of the arm is measured  then 5 degrees is added to go down or subtracted to go up.
basic.forever(function () {
    let RotateNum = 0
    while (read_keyboard() == ROTATE_CW) {
        MoveServo(RotateNum, ServoBit.getServoActual(RotateNum) - 5, speed_1)
    }
    while (read_keyboard() == RotCCW) {
        MoveServo(RotateNum, ServoBit.getServoActual(RotateNum) + 5, speed_1)
    }
    while (read_keyboard() == armdown) {
        MoveServo(UpDnNum, ServoBit.getServoActual(UpDnNum) - 5, speed_1)
    }
    while (read_keyboard() == armup) {
        MoveServo(UpDnNum, ServoBit.getServoActual(UpDnNum) + 5, speed_1)
    }
    while (read_keyboard() == armin) {
        MoveServo(InOutNum, ServoBit.getServoActual(InOutNum) + 5, speed_1)
    }
    while (read_keyboard() == arm_out) {
        MoveServo(InOutNum, ServoBit.getServoActual(InOutNum) - 5, speed_1)
    }
    // claw close
    while (read_keyboard() == ClawClose) {
        MoveServo(ClawNum, ServoBit.getServoActual(ClawNum) - 5, speed_1)
    }
    while (read_keyboard() == ClawOpen) {
        MoveServo(ClawNum, ServoBit.getServoActual(ClawNum) + 5, speed_1)
    }
})
