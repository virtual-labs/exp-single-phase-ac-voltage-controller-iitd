const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),


  set() {
    let index = 0;
    this.allItems = {

      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_procedure:this.allImgsDom[index++],
      formulas_universal:this.allImgsDom[index++],
      // ! Procedure formula Nomenclature images end

      //! EE8 images added here
      btn_plot:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      part_1_circuit:this.allImgsDom[index++],
      part_1_component_1:this.allImgsDom[index++],
      part_1_component_1_1:this.allImgsDom[index++],
      part_1_component_1_2:this.allImgsDom[index++],
      part_1_component_2:this.allImgsDom[index++],
      part_1_component_2_1:this.allImgsDom[index++],
      part_1_component_2_2:this.allImgsDom[index++],
      part_1_connectiion_completed:this.allImgsDom[index++],
      part_1_frame:this.allImgsDom[index++],
      part_1_terminal_1:this.allImgsDom[index++],
      part_1_terminal_2:this.allImgsDom[index++],
      part_1_text_1:this.allImgsDom[index++],
      part_1_text_2:this.allImgsDom[index++],
      part_2_btn_r_load:this.allImgsDom[index++],
      part_2_btn_r_l_load:this.allImgsDom[index++],
      part_2_circuit:this.allImgsDom[index++],
      part_2_graph_empty:this.allImgsDom[index++],
      part_2_r_load_graph_1:this.allImgsDom[index++],
      part_2_r_load_graph_2:this.allImgsDom[index++],
      part_2_r_load_graph_3:this.allImgsDom[index++],
      part_2_r_l_load_graph_1:this.allImgsDom[index++],
      part_2_r_l_load_graph_2:this.allImgsDom[index++],
      part_2_r_l_load_graph_3:this.allImgsDom[index++],
      part_2_text_for_r_load:this.allImgsDom[index++],
      part_2_text_for_r_l_load:this.allImgsDom[index++],
      part_3_circuit:this.allImgsDom[index++],
      part_3_select_option_1:this.allImgsDom[index++],
      part_3_select_option_2:this.allImgsDom[index++],
      part_3_tab_1:this.allImgsDom[index++],
      part_3_tab_2:this.allImgsDom[index++],
      part_3_tab_3:this.allImgsDom[index++],
      part_3_tab_4:this.allImgsDom[index++],
      part_3_tab_5:this.allImgsDom[index++],
      part_3_text_load_1:this.allImgsDom[index++],
      part_3_text_load_2:this.allImgsDom[index++],
      btn_record:this.allImgsDom[index++],
      btn_delete:this.allImgsDom[index++],
      part_1_text_3:this.allImgsDom[index++],
      part_2_helper:this.allImgsDom[index++],
      part_2_circuit_r_load :this.allImgsDom[index++],
      part_2_circuit_r_l_load :this.allImgsDom[index++],
      part_4_circuit : this.allImgsDom[index++],
      part_4_bulb_1 : this.allImgsDom[index++],
      part_4_bulb_2 : this.allImgsDom[index++],
      part_4_bulb_3 : this.allImgsDom[index++],
      part_4_text : this.allImgsDom[index++],
      right_tick_1: this.allImgsDom[index++],
      right_tick_2: this.allImgsDom[index++],
      right_tick_3: this.allImgsDom[index++],
      right_tick_4: this.allImgsDom[index++],
      right_tick_5: this.allImgsDom[index++],
      part_3_alpha_text: this.allImgsDom[index++],
      part_3_beta_text: this.allImgsDom[index++],
      r_l_load: this.allImgsDom[index++],
      btn_auto: this.allImgsDom[index++],
      btn_manual: this.allImgsDom[index++],
      slider_v_arrow_application_step: this.allImgsDom[index++],
      btn_hint:this.allImgsDom[index++],
      hint_box:this.allImgsDom[index++],

      //! new
      
      beta_line_blinking:this.allImgsDom[index++],
      bnt_click:this.allImgsDom[index++],
      btn_firing_angle:this.allImgsDom[index++],
      btn_input_voltage:this.allImgsDom[index++],
      btn_load_inductance:this.allImgsDom[index++],
      btn_load_resistance:this.allImgsDom[index++],
      components_rl_load:this.allImgsDom[index++],
      components_r_load:this.allImgsDom[index++],
      rl_load_click_1:this.allImgsDom[index++],
      rl_load_click_2:this.allImgsDom[index++],
      rl_load_click_3:this.allImgsDom[index++],
      rl_load_click_4:this.allImgsDom[index++],
      r_load_click_1:this.allImgsDom[index++],
      r_load_click_2:this.allImgsDom[index++],
      r_load_click_3:this.allImgsDom[index++],
      r_load_click_4:this.allImgsDom[index++],
      val_a:this.allImgsDom[index++],
      val_l:this.allImgsDom[index++],
      val_r:this.allImgsDom[index++],
      val_v:this.allImgsDom[index++],
      circle:this.allImgsDom[index++],
      //! EE8 images end here



      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
