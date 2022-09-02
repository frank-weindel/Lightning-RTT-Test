/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2022 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Lightning, Utils } from '@lightningjs/sdk';

// prettier-ignore
type ContainerType =
  | typeof Lightning.Element<
    {
      Logo: object;
      Mystery: object;
      Container: ContainerType
    } & Lightning.Element.TemplateSpec
  >;

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  NestedTest: {
    Container: ContainerType;
  };
  ParallelTest: {
    SideContainer1: {
      Logo: object;
    };
    SideContainer2: {
      Logo: object;
    };
    SideContainer3: {
      Logo: object;
    };
    SideContainer4: {
      Logo: object;
    };
    SideContainer5: {
      Logo: object;
    };
    SideContainer6: {
      Logo: object;
    };
    SideContainer7: {
      Logo: object;
    };
    SideContainer8: {
      Logo: object;
    };
    SideContainer9: {
      Logo: object;
    };
    SideContainer10: {
      Logo: object;
    };
  };
  Text: object;
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  readonly Background = this.getByRef('Background')!;
  readonly NestedTest = this.getByRef('NestedTest')!;
  readonly nestedContainers: Lightning.Element[] = [
    this.NestedTest.getByRef('Container')!,
    this.NestedTest,
    this,
  ];

  readonly ParallelTest = this.getByRef('ParallelTest')!;
  readonly SideContainer1 = this.ParallelTest.getByRef('SideContainer1')!;
  readonly SideContainer2 = this.ParallelTest.getByRef('SideContainer2')!;
  readonly SideContainer3 = this.ParallelTest.getByRef('SideContainer3')!;
  readonly SideContainer4 = this.ParallelTest.getByRef('SideContainer4')!;
  readonly SideContainer5 = this.ParallelTest.getByRef('SideContainer5')!;
  readonly SideContainer6 = this.ParallelTest.getByRef('SideContainer6')!;
  readonly SideContainer7 = this.ParallelTest.getByRef('SideContainer7')!;
  readonly SideContainer8 = this.ParallelTest.getByRef('SideContainer8')!;
  readonly SideContainer9 = this.ParallelTest.getByRef('SideContainer9')!;
  readonly SideContainer10 = this.ParallelTest.getByRef('SideContainer10')!;

  readonly sideContainers = [
    this.SideContainer1,
    this.SideContainer2,
    this.SideContainer3,
    this.SideContainer4,
    this.SideContainer5,
    this.SideContainer6,
    this.SideContainer7,
    this.SideContainer8,
    this.SideContainer9,
    this.SideContainer10,
  ];

  readonly Text = this.getByRef('Text')!;

  private rttDepth = 0;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    function genParallelTile(x: number, y: number) {
      return {
        x: 384 * x,
        y: 540 * y,
        w: 384,
        h: 540,
        Logo: {
          x: (w: number) => w / 2,
          y: (h: number) => h / 2,
          mountX: 0.5,
          mountY: 0.5,
          src: Utils.asset('images/logo.png'),
        },
      };
    }

    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      NestedTest: {
        w: 1920,
        h: 1080,
        Container: {
          w: 1920,
          h: 1080,
          Logo: {
            mountX: 0.5,
            mountY: 1,
            x: 960,
            y: 600,
            src: Utils.asset('images/logo.png'),
          },
          Mystery: {
            x: 930,
            y: 400,
            w: 150,
            h: 150,
            scale: 0,
            src: Utils.asset('images/mystery.png'),
          },
        },
      },
      ParallelTest: {
        visible: false,
        SideContainer1: genParallelTile(0, 0),
        SideContainer2: genParallelTile(1, 0),
        SideContainer3: genParallelTile(2, 0),
        SideContainer4: genParallelTile(3, 0),
        SideContainer5: genParallelTile(4, 0),
        SideContainer6: genParallelTile(0, 1),
        SideContainer7: genParallelTile(1, 1),
        SideContainer8: genParallelTile(2, 1),
        SideContainer9: genParallelTile(3, 1),
        SideContainer10: genParallelTile(4, 1),
      },
      Text: {
        mount: 0.5,
        x: 960,
        y: 720,
        text: {
          text: "Let's start Building!",
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
    };
  }

  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf') as string,
      },
    ];
  }

  override _init() {
    // document.getElementsByTagName('canvas')[0]!.style.transformOrigin = 'left top';
    // document.getElementsByTagName('canvas')[0]!.style.scale = '10';
    this.stage.__frameDelay = 0;
    // this.Background.animation({
    //   duration: 15,
    //   repeat: -1,
    //   delay: 1,
    //   actions: [
    //     {
    //       p: 'color',
    //       v: {
    //         0: { v: 0xfffbb03b },
    //         0.5: { v: 0xfff46730 },
    //         0.8: { v: 0xfffbb03b },
    //       },
    //     },
    //   ],
    // }).start()

    this.NestedTest.getByRef('Container')!
      .getByRef('Logo')!
      .animation({
        duration: 5,
        repeat: -1,
        actions: [{ p: 'scale', v: { 0: 1, 0.5: 2, 1: 1 } }],
      })
      .start();

    this.sideContainers.forEach((Container) => {
      Container.getByRef('Logo')!
        .animation({
          duration: 5,
          repeat: -1,
          actions: [{ p: 'scale', v: { 0: 1, 0.5: 2, 1: 1 } }],
        })
        .start();
    });

    // this.Text.animation({
    //   duration: 5,
    //   repeat: -1,
    //   actions: [
    //     { p: 'y', v: { 0: this.Text.y, 0.5: 800, 1: this.Text.y } },
    //     { p: 'alpha', v: { 0: 1, 0.5: 0, 1: 1 } },
    //   ],
    // }).start();

    // this.NestedTest.getByRef('Container')!
    //   .getByRef('Logo')!
    //   .animation({
    //     duration: 5,
    //     repeat: -1,
    //     actions: [
    //       { p: 'x', v: { 0: this.Mystery.x, 0.5: 1025, 1: this.Mystery.x } },
    //       { p: 'y', v: { 0: this.Mystery.y, 0.5: 550, 1: this.Mystery.y } },
    //       { p: 'scale', v: { 0: this.Mystery.scale, 0.5: 1, 1: this.Mystery.scale } },
    //     ],
    //   })
    //   .start();
    this.updateText();
  }

  override _handleUp() {
    this.stage.__frameDelay += 1;
    this.Text.text = `${this.stage.__frameDelay}`;
    this.updateText();
  }

  override _handleDown() {
    this.stage.__frameDelay -= 1;
    if (this.stage.__frameDelay < 0) {
      this.stage.__frameDelay = 0;
    }
    this.updateText();
  }

  override _handleRight() {
    this.updateRttDepth(+1);
    this.updateText();
  }

  override _handleLeft() {
    this.updateRttDepth(-1);
    this.updateText();
  }

  override _handleKey(e: KeyboardEvent) {
    let handled = false;
    if (e.code === 'Digit1') {
      this.NestedTest.visible = true;
      this.ParallelTest.visible = false;
      handled = true;
    } else if (e.code === 'Digit2') {
      this.NestedTest.visible = false;
      this.ParallelTest.visible = true;
      handled = true;
    }

    if (handled) {
      this.rttDepth = 0;
      this.stage.__frameDelay = 0;
      this.updateRttDepth();
      this.updateText();
    }
  }

  private updateRttDepth(change: -1 | 0 | 1 = 0) {
    const maxRtt = this.NestedTest.visible === true ? 9999 : 10;

    const oldDepth = this.rttDepth;
    let newDepth = this.rttDepth + change;
    if (newDepth < 0 || newDepth > maxRtt) {
      change = 0;
      newDepth = oldDepth;
    } else {
      this.rttDepth = newDepth;
    }
    if (this.NestedTest.visible) {
      console.log(
        this.nestedContainers.length,
        newDepth,
        change === 1 && newDepth > this.nestedContainers.length,
      );
      if (change === 1 && newDepth > this.nestedContainers.length) {
        const OuterContainer = this.NestedTest.getByRef('Container')!;
        // Temporarily store inside of Background element
        this.Background.add(OuterContainer);
        // Remove original container
        this.NestedTest.patch({
          Container: undefined,
        });
        // Patch in a new container which contains the other container
        this.NestedTest.patch({
          Container: {
            w: 1920,
            h: 1080,
            Container: OuterContainer,
          },
        });
        const NewOuterContainer = this.NestedTest.getByRef('Container')!;
        this.nestedContainers.unshift(NewOuterContainer);
      }
      console.log(this.nestedContainers);
      this.nestedContainers.forEach((Container, i) => {
        Container.rtt = newDepth > i;
      });
    } else {
      this.sideContainers.forEach((SideContainer, i) => {
        const Logo = SideContainer.getByRef('Logo')!;
        if (newDepth > i) {
          SideContainer.rtt = true;
          Logo.color = 0xff00ff00;
        } else {
          SideContainer.rtt = false;
          Logo.color = 0xffffffff;
        }
      });
      this.rtt = newDepth >= 11;
    }
  }

  updateText() {
    const mode = this.NestedTest.visible ? 'Nested' : 'Parallel';
    this.Text.text = `mode: ${mode}, frameDelay: ${this.stage.__frameDelay}, rttDepth: ${this.rttDepth}`;
  }
}
